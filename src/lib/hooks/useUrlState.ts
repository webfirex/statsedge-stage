import { useSetState } from "@mantine/hooks";
import { useRouter } from "next/router";
import { useEffect } from "react";
import z, { type ZodRawShape } from "zod";

function useUrlState<RS extends ZodRawShape>(
  zodRawShape: RS,
  postfix: string
): [
  z.infer<z.ZodObject<RS>>,
  (value: Partial<z.infer<z.ZodObject<RS>>>) => void
] {
  const Router = useRouter();

  const ZodSchema = z.object(zodRawShape);

  const [InternalState, setInternalState] = useSetState(ZodSchema.parse({}));

  useEffect(() => {
    if (!Router.isReady) return;

    const { query } = Router;

    const keysWithPostfix = Object.keys(query).filter((key) =>
      key.startsWith(postfix)
    );

    const parsedQuery = keysWithPostfix.reduce((acc, key) => {
      const keyWithoutPostfix = key.replace(`${postfix}-`, "");
      return {
        ...acc,
        [keyWithoutPostfix]: query[key],
      };
    }, {});

    setInternalState(ZodSchema.parse(parsedQuery));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Router.isReady, Router.query]);

  const setState = (rawValue: Partial<z.infer<z.ZodObject<RS>>>) => {
    const addPostfix = (key: string) => `${postfix}-${key}`;

    const objWithAddedPostfix = Object.keys(rawValue).reduce(
      (acc, key) => ({
        ...acc,
        [addPostfix(key)]: rawValue[key],
      }),
      {}
    );

    void Router.replace(
      {
        pathname: Router.pathname,
        query: {
          ...Router.query,
          ...objWithAddedPostfix,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  return [InternalState, setState];
}

const UrlNumber = (defaultVal: number, opt?: { min?: number; max?: number }) =>
  z
    .string()
    .transform((val) => {
      const parsed = Number(val);

      if (Number.isNaN(parsed)) return defaultVal;

      if (opt?.min && parsed < opt.min) return opt.min;

      if (opt?.max && parsed > opt.max) return opt.max;

      return parsed;
    })
    .default(String(defaultVal));

const UrlBool = (defaultVal: boolean) =>
  z
    .string()
    .transform((val) => val === "true")
    .default(String(defaultVal));

const UrlString = (defaultt: string) => z.string().default(String(defaultt));

const UrlEnum = <U extends string, T extends Readonly<[U, ...U[]]>>(
  values: T
) => z.enum(values);

export { useUrlState, UrlNumber, UrlBool, UrlString, UrlEnum };
