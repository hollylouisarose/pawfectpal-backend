export class NotFound extends Error {
  constructor(){
    super()

    this.name = 'NotFound'
  }

} 


export class Unauthorized extends Error {
  constructor(){
    super()

    this.name = 'Unauthorized'
  }
  
}