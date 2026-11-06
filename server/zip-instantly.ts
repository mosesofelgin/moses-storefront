import { Response } from "express";
import { ENV } from "./_core/env";
import { streamZipDownload } from "./_core/zip-download";

const STORAGE = `${ENV.publicSiteUrl}/manus-storage`;

export function getInstantlyAlbumFiles(origin = ENV.publicSiteUrl) {
  const storage = `${origin}/manus-storage`;
  return [
    ["Gave My All_2a4c20a3.mp3", "01-Gave My All.mp3"],
    ["Healing Music_f24e7226.mp3", "02-Healing Music.mp3"],
    ["Blue Print_0b8a1857.mp3", "03-Blue Print.mp3"],
    ["Freefalling_a02d7735.mp3", "04-Freefalling.mp3"],
    ["Unfuckwitable_dac15be6.mp3", "05-Unfuckwitable.mp3"],
    ["Wash Away the Blood_f83fa8f4.mp3", "06-Wash Away the Blood.mp3"],
    ["Do U Roc Wit Me_33552255.mp3", "07-Do U Roc Wit Me.mp3"],
    ["Show Me_6c944a32.mp3", "08-Show Me.mp3"],
    ["Apologies Dont Heal a Broken Heart_cd57fe1b.mp3", "09-Apologies Dont Heal a Broken Heart.mp3"],
    ["100K Idea_bf68975d.mp3", "10-100K Idea.mp3"],
    ["Knowme_2c62facb.mp3", "11-Know Me.mp3"],
  ].map(([path, filename]) => ({ url: `${storage}/${path}`, filename }));
}

export async function streamInstantlyZip(res: Response, origin?: string) {
  await streamZipDownload(getInstantlyAlbumFiles(origin), res, "INSTANTLY-The-Process-11-Song-Project.zip");
}
