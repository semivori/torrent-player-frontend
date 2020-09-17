import React from "react"
import Plyr from 'plyr'
import 'plyr/dist/plyr.css'

class PlyrComponent extends React.Component {
    constructor() {
        super()
        this.handlePause = this.handlePause.bind(this)
        this.componentWillUnmount = this.componentWillUnmount.bind(this)
    }

    componentDidMount() {
        this.player = new Plyr(".js-plyr", {
            controls: [
                'play-large', // The large play button in the center
                //'restart', // Restart playback
                'rewind', // Rewind by the seek time (default 10 seconds)
                'play', // Play/pause playback
                'fast-forward', // Fast forward by the seek time (default 10 seconds)
                'progress', // The progress bar and scrubber for playback and buffering
                'current-time', // The current time of playback
                'duration', // The full duration of the media
                'mute', // Toggle mute
                'volume', // Volume control
                //'captions', // Toggle captions
                'settings', // Settings menu
                'pip', // Picture-in-picture (currently Safari only)
                //'airplay', // Airplay (currently Safari only)
                //'download', // Show a download button with a link to either the current source or a custom URL you specify in your options
                'fullscreen', // Toggle fullscreen
            ]
        })

        this.player.source = {
            type: 'video',
            title: 'Example title',
            sources: [
                {
                    src: this.props.source,
                }
            ],
        }

        this.player.on('play', event => {
            const instance = event.detail.plyr;
            if (instance.currentTime < 2 && this.props.startFrom) {
                instance.currentTime = this.props.startFrom
            }
        })

        this.player.on('pause', this.handlePause)
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.source !== nextProps.source
    }

    componentDidUpdate() {

    }

    componentWillUnmount() {
        this.props.saveTime(this.player.currentTime)
        this.player.destroy()
    }

    handlePause(event) {
        this.props.saveTime(this.player.currentTime)
    }

    render() {
        if (this.props.source) {
            return (
                <video
                    src={this.props.source}
                    className="js-plyr plyr"
                    crossOrigin="true"
                ></video>
            )
        } else {
            return <span>No source</span>
        }

    }
}

export default PlyrComponent