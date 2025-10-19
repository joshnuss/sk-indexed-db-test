# Experiment: Track last video position with IndexDB

When user view a video, the `ontimeupdate` is captured and the `video.currentTime` is persisted to IndexDb.
Then if the user comes back later, the position of the video can be restored.
