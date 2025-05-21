export function handleMic(
    audio,
    mode,
    setMic,
    setMode,
    audioSpeaking,
    playChunks,
    audioData,
    controller,
    { setStream }
) {
    // <-- remove current audio chunks and audio source -->
    audioData.current = [];
    playChunks.current = [];
    audioSpeaking.current = false;
    audio.current.pause();
    audio.current.currentTime = 0;
    audio.current.removeAttribute("src");
    setStream(() => null);

    switch (mode) {
        case "idle":
            setMode(() => "listening");
            setMic(() => true);
            break;
        case "speaking":
            setMode(() => "listening");
            setMic(() => true);
            break;
        case "listening":
            setMode(() => "idle");
            setMic(() => false);
            break;
        case "thinking":
            try {
                if (controller.current) {
                    controller.current.abort("Abort Sending Request");
                }
            } catch (err) {
                console.log(err);
            }
            setMode(() => "listening");
            setMic(() => true);
            break;
        default:
            console.log("Invalid Mode");
            break;
    }
}