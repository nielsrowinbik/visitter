export class RequiresProPlanError extends Error {
  constructor(message = "This action requires a Premium subscription") {
    super(message)
  }
}