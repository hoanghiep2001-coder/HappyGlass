
const AudioManager = cc.Class({
    extends: cc.Component,

    properties: {
        backgroundMusic: cc.AudioClip,
        clickMusic: cc.AudioClip,
        loseMusic: cc.AudioClip,
        waterDropMusic: cc.AudioClip,
    },

    playBackgroundMusic () {
        cc.audioEngine.playMusic(this.backgroundMusic, true);
    },

    playLoseMusic() {
        cc.audioEngine.playMusic(this.loseMusic, false);
    },

    playwaterDropMusicMusic() {
        const music = cc.audioEngine.play(this.waterDropMusic, true, 1);
        const delayAction = cc.delayTime(1.5);
        const callback = cc.callFunc(function() {
            cc.audioEngine.stop(music);
        });
        const sequence = cc.sequence(delayAction, callback);
        this.node.runAction(sequence);
    },

    playclickMusicMusic() {
        cc.audioEngine.playMusic(this.clickMusic, false);
    }
});
