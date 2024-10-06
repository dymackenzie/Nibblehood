
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getAuth } from "firebase/auth";
import type { NextApiRequest, NextApiResponse } from "next";


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    const auth = getAuth();
    res.status(200).end();
}
