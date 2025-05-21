export async function handleStart(
    mediaStream,
    recorder,
    context,
    streamNode,
    analyserNode,
    setRecording,
    interval,
    index,
    speaking,
    setMode,
    setMic
) {
    try {
        mediaStream.current = await navigator.mediaDevices.getUserMedia({
            audio: {
                noiseSuppression: true,
                echoCancellation: true,
            },
        });
        recorder.current = new MediaRecorder(mediaStream.current, {
            mimeType: "audio/mp4",
        });
        context.current = new AudioContext();
        streamNode.current = new MediaStreamAudioSourceNode(context.current, {
            mediaStream: mediaStream.current,
        });
        analyserNode.current = new AnalyserNode(context.current);
        streamNode.current.connect(analyserNode.current);

        setRecording(() => true);

        analyserNode.current.smoothingTimeConstant = 0;
        analyserNode.current.fftSize = 2048;

        interval.current = setInterval(() => {
            const lg = analyserNode.current.fftSize;
            const view = new Uint8Array(lg);
            analyserNode.current.getByteTimeDomainData(view);

            let max = 0;
            for (let i = 0; i < view.length; i++) {
                let v = view[i] / 128 - 1;
                max += v ** 2;
            }
            const average = Math.sqrt(max / view.length);

            if (average >= 0.01) {
                // Set to true if the user has spoken
                speaking.current = true;
                index.current = 0;
            } else {
                index.current += 1;
                if (index.current >= 5) {
                    if (speaking.current) {
                        setMic(() => false);
                        setMode(() => "thinking");
                    } else {
                        setMic(() => false);
                        setMode(() => "idle");
                    }
                    // Set to default once the request or recorder stops
                    clearInterval(interval.current);
                    index.current = 0;
                    speaking.current = false;
                }
            }
        }, 1000);

        recorder.current.start();
    } catch (err) {
        console.log(err);
    }
}