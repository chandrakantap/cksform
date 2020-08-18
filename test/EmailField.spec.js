import React from 'react';
import { mount } from 'enzyme';
import { createSerializer } from 'enzyme-to-json';
import { useCKSForm } from '../src/index';
import Errors from '../docs/src/components/Errors';

expect.addSnapshotSerializer(createSerializer({ mode: 'deep', noKey: true, ignoreDefaultProps: true }));

const EmailFieldForm = ({ onSubmit, ...props }) => {
  const { formData, onChangeField, errors, handleSubmit, validateField } = useCKSForm({ emailId: '' });
  return (
    <form noValidate autoComplete="off">
      <input
        type="email"
        name="emailId"
        required
        minLength={10}
        maxLength={12}
        value={formData.emailId}
        onChange={onChangeField}
        onBlur={validateField}
        data-display-name="Email ID"
        {...props}
      />
      <Errors errors={errors} fieldName="emailId" />
      <input id="submitBtn" type="button" value="Submit" onClick={handleSubmit(onSubmit)} />
    </form>
  );
}
describe('Email field', () => {
  test('renders properly', () => {
    const warapper = mount(<EmailFieldForm />);
    expect(warapper).toMatchSnapshot();
  });

  test('Validates when no value provided', () => {
    const warapper = mount(<EmailFieldForm />);
    warapper.find("input[type='button']").first().simulate('click');
    expect(warapper).toMatchSnapshot();
  });

  test('Validates when invalid value provided', () => {
    const warapper = mount(<EmailFieldForm />);
    warapper.find("input[type='email']").first().simulate('change', { target: { name: 'emailId', value: "pal.chand" } });
    warapper.find("input[type='button']").first().simulate('click');
    expect(warapper).toMatchSnapshot();
  });

  test('Call onSubmit if validation successful', () => {
    const onSubmit = jest.fn();
    const warapper = mount(<EmailFieldForm onSubmit={onSubmit} />);
    warapper.find("input[type='email']").first().simulate('change', { target: { name: 'emailId', value: "abcd@abc.com" } });
    warapper.find("input[type='button']").first().simulate('click');
    expect(onSubmit).toHaveBeenCalled();
    expect(warapper).toMatchSnapshot();
  });
})
