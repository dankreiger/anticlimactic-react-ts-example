import * as enzyme from 'enzyme';
import * as React from 'react';
import App from './App';

describe('App', () => {
  describe('rendering', () => {
    const renderedComponent: enzyme.ShallowWrapper = enzyme.shallow(<App />);
    test('renders as expected', () => {
      expect(renderedComponent).toBeTruthy();
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe('structure', () => {
    let component: enzyme.ReactWrapper;
    beforeEach(() => {
      component = enzyme.mount(<App />); // Enzyme's shallow not working with React state hooks
    });
    describe('button', () => {
      test('renders 1 button html element with the text "Click me"', () => {
        expect(component.find('button').length).toBe(1);
      });
      test('button has text "Click me"', () => {
        expect(component.find('button').text()).toBe('Click me 0');
      });      
    });
    describe('inputs', () => {
      test('renders 2 input html elements', () => {
        expect(component.find('input').length).toBe(2);
      });
    });

    // describe('div for window width', () => {
    //   test('renders 1 div.windowWidth', () => {
    //     expect(component.find('.windowWidth').length).toBe(1);
    //   });
    //   test('div.windowWidth displays the current window width information', () => {
    //     expect(component.find('.windowWidth').text()).toBe('Window width: 1024'); // 1024 is the JSDOM default
    //   });      
    // })

  });

  describe('behavior', () => {
    let component: enzyme.ShallowWrapper;
    beforeEach(() => {
      // global.innerWidth = 500;
      component = enzyme.shallow(<App />); // Enzyme's shallow isn't working with state hooks
    });

    test('renders an incremented value on button click', () => {
      for (let i in [0, 1, 2, 3]) {
        if(i) {
          expect(component.find('button').text()).toBe(`Click me ${i}`);
          component.find('button').simulate('click');
          component.update(); // Read: enzyme update
        }
      }
    });

    // test('renders the window size on resize', () => {
    //   expect(component.find('.windowWidth').text()).toBe('Window width: 500');
    //   global.innerWidth = 1023;
    //   component = mount(<App />); // only works like this right now - .update() not working on component
    //   expect(component.find('.windowWidth').text()).toBe('Window width: 1023');
    // });
  });
});
