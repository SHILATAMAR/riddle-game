// The Riddle class. Export it as the default export.
//
// Properties (received in the constructor):
// - id
// - name
// - taskDescription
// - correctAnswer
//
// Method:
// - ask(prompt)
//   - show the riddle (name and taskDescription) to the player
//   - ask the player for an answer using the `prompt` function that is passed in
//   - keep asking until the answer is correct

export default class Riddle {
    constructor(riddleData) {
        this.id = riddleData.id;
        this.name = riddleData.name;
        this.taskDescription = riddleData.taskDescription;
        this.correctAnswer = riddleData.correctAnswer;
    }
    ask(prompt) {
        let userAnswer = prompt(`${this.taskDescription} `);
        while (userAnswer !== this.correctAnswer) {
            userAnswer = prompt(`Wrong, try again ${this.taskDescription} `)
        }
        return true
    }

}
