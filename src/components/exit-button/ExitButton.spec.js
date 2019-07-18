import { expect } from 'chai';
import React from 'react';
import ExitButton from './ExitButton';
import {mount,configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('#ExitButton', () => {
  function mountComponent(props = {}) {
    return mount(<ExitButton text='REACT SF' />);
  }
  it('Should render', () => {
    expect(ExitButton).to.be.ok;
  });
  it('Should contain text REACT SF', () => {
    const wrapper = mountComponent();
    expect(wrapper.text()).to.equal('REACT SF');
  });
});