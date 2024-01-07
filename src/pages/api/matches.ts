import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {

    if (req.method == "POST") {
        res.status(200).json({ message: "Next Post api" })

    } else {
        res.status(404).json({ message: 'No rest api' })
    }
}