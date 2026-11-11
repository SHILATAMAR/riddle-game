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
  constructor(id, name, lowestTime = null) {
    this.id = id;
    this.name = name;
    this.lowestTime = lowestTime;
  }
}