import { Button, Dialog, DialogContent, IconButton } from "@mui/material";
import type { Torrent } from "../types/movies";
import CloseIcon from "@mui/icons-material/Close";
import { useMemo, useState } from "react";
interface TorrentInfoProps {
    title: string,
    torrent: Torrent[]
}

function TorrentDialog({ title, torrent }: TorrentInfoProps) {

    function downloadTorrent(torrent: Torrent) {
        const link = document.createElement("a");
        link.href = torrent.url;
        link.download = `${title}-${torrent.quality}.torrent`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const [open, setOpen] = useState<boolean>(false);

    const sortedBySeeds = useMemo(() => {
        const sorted = [...torrent].sort(
            (a, b) => b.seeds - a.seeds
        );
        return sorted;
    }, [torrent]);

    const torrentEnabled = import.meta.env.VITE_TORRENT === "true";

    return (<>
        <Button sx={{
            mt: 2,
            backgroundColor: "#49c916",
            color: "#fff",
            fontWeight: 600,
            "&:hover": {
                backgroundColor: "#3da912",
            },
        }} onClick={() => setOpen(true)}>Click To see Torrent Info</Button>
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg" fullWidth className="p-2">
            <IconButton
                aria-label="close"
                onClick={() => setOpen(false)}
                sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    zIndex: 1,
                    color: "white",
                    "&:hover": {
                        backgroundColor: "#49c916",
                    },
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent sx={{
                background: "linear-gradient(145deg, #111827, #000000)",
                color: "#fff",
            }}>
                <div className="font-bold mb-3">Download Torrent File</div>
                {sortedBySeeds.length === 0 && (
                    <div className="text-center">
                        No torrent available
                    </div>
                )}
                {sortedBySeeds.map((torrent) => (
                    <div key={`${torrent.quality}-${torrent.size}`} className="border border-gray-700 rounded-lg p-4 mb-4 text-center">
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-3">
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

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
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

                            {torrentEnabled &&
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
                            }
                        </div>
                    </div>
                ))}
            </DialogContent>
        </Dialog >
    </>)
}

export default TorrentDialog;