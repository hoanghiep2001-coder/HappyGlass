// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const AudioManager = cc.Class({
    extends: cc.Component,

    properties: {
        backgroundMusic: cc.AudioClip,
        clickMusic: cc.AudioClip,
        loseMusic: cc.AudioClip,
        waterDropMusic: cc.AudioClip,
    },

    playBackgroundMusic () {
        // cc.audioEngine.playMusic(this.backgroundMusic, true)
    },

    playLoseMusic() {
        // cc.audioEngine.playMusic(this.loseMusic, false)
    },

    playwaterDropMusicMusic() {
        // cc.audioEngine.playMusic(this.waterDropMusic, false)
    },

    playclickMusicMusic() {
        // cc.audioEngine.playMusic(this.clickMusic, false)
    }

    // update (dt) {},
});
