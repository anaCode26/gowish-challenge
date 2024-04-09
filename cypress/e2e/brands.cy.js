import { navbar , brands } from './pages';

describe('Brands', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('should validate folowers', () => {
        cy.get(navbar.inspiration).should('be.visible')
        cy.get(navbar.inspiration).click()
        cy.get(navbar.inspirationList.brands).click()
        cy.url().should('include', '/da/brands')        
        cy.get(".ant-btn").contains(brands.category.bornAndBabyText).then((els) => {
          const buttons = [...els]
          cy.wrap(buttons[0]).click()
        });
        cy.get(brands.item).should('be.visible')
        const tries = Array.from({length:5},(v,k)=>k+1)
        cy.wrap(tries).each((_) => {
           cy.get(brands.viewAllButton).if().click()
        })
        cy.get('body').find(brands.card).should('be.visible')        
        cy.get('body').find(brands.card)
            .parent()
            .find('img')
            .click()     
        cy.get(brands.trendingListCard)
            .find('div:contains("De største bamser")').click()
        cy.get(brands.followerLabel).should((followerCount) => {
            const text = followerCount.text()
            expect(text).to.match(/\b\d+\s\D+\b/)
        });
    })
})

  
 