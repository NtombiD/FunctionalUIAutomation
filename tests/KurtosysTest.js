import { Selector } from 'testcafe';

fixture `Resources`
.page`https://www.kurtosys.com/`;
const resourceSelect = Selector('#kurtosys-menu-item-59810');
const resourceOption = resourceSelect.find('li');

test('My first test', async t => {

    //navigate to RESOURCES and click on “White Papers & eBooks”
    await t
    .maximizeWindow()
    .wait(2000)
    .hover(resourceSelect)
    .expect(Selector('.elementor-section-wrap').visible).ok()
    .click(Selector('.elementor-icon-list-item').withText('White Papers & eBooks'));

    //navigating to white papers page, click on any white paper title
    await t
    .expect(Selector('h2').withExactText('White Papers').visible).ok()
    .click(Selector('a').withText('UCITS White Paper'))
    .wait(3000)

    //Download the White Paper
    await t
    .switchToIframe(Selector('iframe').withAttribute('src','https://www2.kurtosys.com/l/18882/2020-06-04/bx16sd'))
    .click(Selector('.form-field.first_name.pd-text.required').withText('First Name'))
    .typeText('.form-field.first_name.pd-text.required', 'Ntombifuthi')

   .click(Selector('.form-field.last_name.pd-text.required').withText('Last Name'))
    .typeText('.form-field.last_name.pd-text.required', 'Dladla')

   //.expect(Selector('.form-field.email.pd-text.required').withText('Email').visible).ok()
  
    .click(Selector('.form-field.company.pd-text').withText('Company'))
    .typeText('.form-field.company.pd-text', 'Kurtosys')
    .click(Selector('.form-field.industry.pd-text').withText('Industry'))
    .typeText('.form-field.industry.pd-text', 'Saas')
    .click('.submit')
    .expect(Selector('p').withText('This field is required').exists).ok()
    .takeScreenshot();

});
test('user cannot send copy with empty required fields', async t => {
    
    await t
    .maximizeWindow()
    .wait(2000)
    .hover(resourceSelect)
    .expect(Selector('.elementor-section-wrap').visible).ok()
    .click(Selector('.elementor-icon-list-item').withText('White Papers & eBooks'));
    await t
    .expect(Selector('h2').withExactText('White Papers').visible).ok()
    .click(Selector('a').withText('UCITS White Paper'))
    .wait(3000)

    await t
    .switchToIframe(Selector('iframe').withAttribute('src','https://www2.kurtosys.com/l/18882/2020-06-04/bx16sd'))
    .click('.submit')
    .expect(Selector('.form-field.first_name.pd-text.required.error').withText('This field is required').exists).ok()
    .expect(Selector('.form-field.last_name.pd-text.required.error').withText('This field is required').exists).ok()
    .expect(Selector('.form-field.email.pd-text.required.error').withText('This field is required').exists).ok()

});