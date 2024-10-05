// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { item1, item2, item3 } from "@/sampledata";
import Item from "@/types/Item";
import type { NextApiRequest, NextApiResponse } from "next";


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Item[]>,
) {
  res.status(200).json([item1, item2, item3]);
}
