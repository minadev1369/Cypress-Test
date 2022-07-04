
describe('verifying the information of countries', () => {
    
   beforeEach('go to the HomePage', () => {
      cy.openHomePage()
   })

   it('Retrieve the information of countries from the API', () => {  

      cy.get('[role="flatdoc-content"] pre').eq(2).invoke('text').then( href => {
         cy.request("GET", href).then((api) => {
            const contries = api.body.slice(0, 15)
         })
      })
   })
})