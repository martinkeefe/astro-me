import mnm08 from "./08_csv";
import mnm09 from "./09_csv";
import mnm11 from "./11_csv";
import mnm14 from "./14_csv";
import mnm15 from "./15_csv";
import mnm18 from "./18_csv";
import mnm22 from "./22_csv";
import mnm23 from "./23_csv";
import mnm25 from "./25_csv";
import mnm27 from "./27_csv";
import mnm29 from "./29_csv";
import mnm31 from "./31_csv";
import mnm33 from "./33_csv";
import mnm34 from "./34_csv";

export type MNMTrack = {
  art_name: string;
  trk_name: string;
  trk_info: string;
  alb_name: string;
  alb_fmt: string;
  alb_year: string;
};

export type MNMPlayList = {
  name: string;
  desc?: string;
  tracks: MNMTrack[];
};

const from_csv = (csv: string): MNMPlayList => {
  const rows = csv.split("\n").map((line) => line.trim().split(";"));

  return {
    name: rows[1][0],
    desc: rows[1][1],
    tracks: rows.slice(2).map((row) => ({
      art_name: row[0],
      trk_name: row[1],
      trk_info: row[2],
      alb_name: row[3],
      alb_fmt: row[4],
      alb_year: row[5],
    })),
  };
};

export const mnm_data = (num: number): MNMPlayList => {
  switch (num) {
    case 8:
      return from_csv(mnm08);
    case 9:
      return from_csv(mnm09);
    case 11:
      return from_csv(mnm11);
    case 14:
      return from_csv(mnm14);
    case 15:
      return from_csv(mnm15);
    case 18:
      return from_csv(mnm18);
    case 22:
      return from_csv(mnm22);
    case 23:
      return from_csv(mnm23);
    case 25:
      return from_csv(mnm25);
    case 27:
      return from_csv(mnm27);
    case 29:
      return from_csv(mnm29);
    case 31:
      return from_csv(mnm31);
    case 33:
      return from_csv(mnm33);
    case 34:
      return from_csv(mnm34);
    default:
      return {
        name: "unknown",
        tracks: [],
      };
  }
};
