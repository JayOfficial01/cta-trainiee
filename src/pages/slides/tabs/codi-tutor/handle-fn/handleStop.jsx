export async function handleStop(
    mediaStream,
    recorder,
    context,
    streamNode,
    analyserNode,
    setRecording,
    interval,
    index,
    speaking,
    mode,
    audioData,
    { url: url, payload: payload },
    setStream,
    controller
) {
    // Set to default once the request or recorder stops
    clearInterval(interval.current);
    index.current = 0;
    speaking.current = false;

    recorder.current.addEventListener("dataavailable", (e) => {
        if (mode !== "thinking") return;
        audioData.current.push(e.data);
    });

    recorder.current.addEventListener("stop", async () => {
        if (mode !== "thinking") return;
        const query = new URLSearchParams(payload).toString();
        const sentUrl = `${url}/tutor/agent?${query}`;

        try {
            const fData = new FormData();
            const audioFile = new File(audioData.current, "audio.mp4", {
                type: "audio/mp4",
            });

            fData.append("file", audioFile);
            controller.current = new AbortController();
            fetch(sentUrl, {
                method: "POST",
                headers: {
                    "x-api-key": "sk-cta-dhqzp3m0tgexub4rbe8mx5lc7gi0sll3",
                    "agent-id": "cta_tzeiooykja6hg0b0",
                },
                body: fData,
                signal: controller.current.signal,
            }).then((resp) => {
                setStream(resp.body);
                audioData.current = [];
            });
        } catch (err) {
            console.log(err);
        }
    });

    try {
        try {
            streamNode.current.disconnect(analyserNode.current);
        } catch (err) {
            console.log(err);
        }
        try {
            context.current.close();
        } catch (err) {
            console.log(err);
        }
        recorder.current.stop();
        mediaStream.current.getAudioTracks().forEach((track) => track.stop());
        setRecording(() => false);
        console.log("recording stopped");
    } catch (err) {
        console.log(err);
    }
}