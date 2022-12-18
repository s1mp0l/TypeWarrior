export function TaskTimer(name, durationInSeconds, onEnd, onTick) {
    let endTime,
        self = this,
        running = false;
    this.name = name;
    this.totalSeconds = durationInSeconds;

    var go = (function tick() {
        let now = new Date().getTime();
        if (now >= endTime) {
            if (typeof onEnd === "function") onEnd.call(self);
            return;
        }
        self.totalSeconds = Math.round((endTime - now) / 1000);
        if (typeof onTick === "function") onTick.call(self);
        window.setTimeout(tick, 1000 / 12);
    });

    this.start = function() {
        // if (running) return;

        running = true;
        endTime = new Date().getTime() + durationInSeconds * 1000;
        go();
    };
}

TaskTimer.prototype.toTimeString = function() {
    let hrs = Math.floor(this.totalSeconds / 60 / 60),
        min = Math.floor(this.totalSeconds / 60 - hrs * 60),
        sec = this.totalSeconds % 60;

    return [(min ?? 0).toString().padStart(2,"0"), (sec ?? 0).toString().padStart(2, "0")].join(" : ");
};