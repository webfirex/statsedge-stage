import { type SVGProps } from "react";

export function LogoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={78}
      height={34}
      fill="none"
      {...props}
    >
      <path
        fill="#fff"
        d="M44.95 24.244h30.08l-4.347 8.921H39.117l5.833-8.92ZM52.034 11.892h24.131l-4.574 9.035H46.658l5.376-9.035Z"
      />
      <path
        fill="#00ACEF"
        d="M25.39 0H78l-4.575 8.235H29.85l-2.973 3.545h20.815L34.654 33.053H0l6.633-8.12h22.188l2.974-4.69H9.607L25.39 0Z"
      />
    </svg>
  );
}

export function LogoIconSm(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={40}
      height={19}
      fill="none"
      {...props}
    >
      <path
        fill="#fff"
        d="M23.03 13.668h15.425l-2.228 5.029H20.039l2.991-5.029ZM26.725 6.709h12.376l-2.346 5.094H23.969l2.756-5.094Z"
      />
      <path
        fill="#00ACEF"
        d="M13.02 0H40l-2.346 4.642H15.308l-1.525 1.999h10.675L17.77 18.633H0l3.402-4.578H14.78l1.525-2.643H4.927L13.02 0Z"
      />
    </svg>
  );
}
