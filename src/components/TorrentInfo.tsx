import { Button, Dialog, DialogContent, IconButton } from "@mui/material";
import type { Torrent } from "../types/movies";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

interface TorrentInfoProps {
    title: string,
    torrent: Torrent[]
}

function TorrentInfo(props: TorrentInfoProps) {

    console.log("torrent infoooo", props);

    function downloadTorrent(torrent: Torrent) {
        console.log(torrent.url)
        const link = document.createElement("a");
        link.href = torrent.url;
        link.download = `${props?.title}-${torrent.quality}.torrent`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const [open, SetOpen] = useState<boolean>(false);
    const sortedBySeeds = [...props.torrent].sort(
        (a, b) => b.seeds - a.seeds
    );

    return (<>
        <Button sx={{
            mt: 2,
            backgroundColor: "#49c916",
            color: "#fff",
            fontWeight: 600,
            "&:hover": {
                backgroundColor: "#3da912",
            },
        }} onClick={() => SetOpen(true)}>Click To see Torrent Info</Button>
        <Dialog open={open} onClose={() => SetOpen(false)} maxWidth="lg" className="p-2">
            <IconButton
                onClick={() => SetOpen(false)}
                sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    zIndex: 1,
                    color: "white",
                    "&:hover": {
                        backgroundColor: "rgba(0,0,0,0.8)",
                    },
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent sx={{
                backgroundColor: "#000",
                color: "#fff",
            }}>
                <div className="font-bold mb-3">Download Torrent File</div>
                <div>
                    {sortedBySeeds.map((torrent, index) => (
                        <div key={index} className="border border-gray-700 rounded-lg p-4 mb-4 text-center">
                            <div className="grid grid-cols-5 mb-3">
                                <div>
                                    <strong>Quality</strong>
                                    <div>{torrent.quality}</div>
                                </div>
                                <div>
                                    <strong>Type</strong>
                                    <div>{torrent.type}</div>
                                </div>
                                <div>
                                    <strong>Video</strong>
                                    <div>{torrent.video_codec}</div>
                                </div>
                                <div>
                                    <strong>Bit Depth</strong>
                                    <div>{torrent.bit_depth}-bit</div>
                                </div>
                                <div>
                                    <strong>Audio</strong>
                                    <div>{torrent.audio_channels}</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-5">
                                <div>
                                    <strong>Size</strong>
                                    <div>{torrent.size}</div>
                                </div>
                                <div>
                                    <strong>Repack</strong>
                                    <div>{torrent.is_repack === "1" ? "Yes" : "No"}</div>
                                </div>
                                <div>
                                    <strong>Seeds</strong>
                                    <div>{torrent.seeds}</div>
                                </div>
                                <div>
                                    <strong>Peers</strong>
                                    <div>{torrent.peers}</div>
                                </div>

                                <Button
                                    sx={{
                                        mt: 2,
                                        backgroundColor: "#49c916",
                                        color: "#fff",
                                        fontWeight: 600,
                                        "&:hover": {
                                            backgroundColor: "#3da912",
                                        },
                                        "&.Mui-disabled": {
                                            backgroundColor: "#d32f2f",
                                            color: "#fff",
                                            cursor: "not-allowed"
                                        }
                                    }}
                                    disabled={!torrent.url || torrent.seeds === 0}
                                    onClick={() => downloadTorrent(torrent)}
                                >
                                    {torrent.seeds === 0 ? <>No Seeds</> : <>Download {torrent.quality}</>}
                                </Button>

                            </div>


                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog >
    </>)
}

export default TorrentInfo;