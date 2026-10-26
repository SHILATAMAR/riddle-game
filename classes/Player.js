// The Player class. Export it as the default export.
//
// Properties:
// - name
// - times (an array that holds the time it took to solve each riddle)
//
// Methods:
// - recordTime(start, end)
//   - calculate the duration (end - start) and add it to the times array
// - showStats()
//   - show the total time and the average time per riddle


export default class Player {
    constructor(name) {
        this.name = name
        this.times = []
    }

    recordTime(start, end) {
        const duration = (end - start) / 1000
        this.times.push(duration)
    }

    showStats() {
        let totalTime = 0;
        for (let i = 0; i < this.times.length; i++) {
            totalTime += this.times[i];
        }
        const averageTime = totalTime / this.times.length || 0;
        console.log(`Game Stats for ${this.name} ---`);
        console.log(`Total time: ${totalTime} seconds`);
        console.log(`Average time per riddle: ${averageTime} seconds`);
    }
}