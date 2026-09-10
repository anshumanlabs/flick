import { Box, Button } from "@mui/material";
import { useState } from "react";

function Test() {
    const [output, setOutput] = useState<string>('');

    function concateChar(value: string) {
        let str = output.concat(value);
        if (str.length >= 3 && str.at(-1) === str.at(-2) && str.at(-2) === str.at(-3)) {
            str = str.slice(0, str.length - 3) + '_';
        }
        setOutput(str);
    }

    return (<>
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 10,
                padding: 20
            }}
        >
            {Array.from({ length: 26 }).map((_, index) => (
                <Button
                    onClick={() => concateChar(String.fromCharCode(65 + index))}
                    key={index}
                    style={{
                        color: 'white',
                        width: 50,
                        height: 50,
                        border: '3px solid green',
                        borderRadius: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {String.fromCharCode(65 + index)}
                </Button>
            ))}
        </div>

        <div style={{
            fontSize: 20, justifyContent: 'center',
            alignItems: 'center',
            display: 'flex'
        }}>{[...output].map((element, index) => (
            <div key={index} className="ml-1">
                {element}
            </div>
        ))}</div>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button
                onClick={() => setOutput('')}
                sx={{
                    color: 'white',
                    width: 80,
                    height: 50,
                    border: '3px solid green',
                    borderRadius: 1,
                }}
            >
                Clear
            </Button>
        </Box>
    </>)
}

export default Test;