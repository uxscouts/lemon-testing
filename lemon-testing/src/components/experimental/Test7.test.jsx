
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test } from 'vitest';
import TestForm2 from './TestForm2';

test('validates the Full Name input constraints', async () => {
  const user = userEvent.setup();
  
  render(
      <TestForm2 />
  );

  const nameInput = screen.getByLabelText(/Full Name:/i);

  // 1. Test: Too short (minLength=2)
  await user.type(nameInput, 'A');
  expect(nameInput.checkValidity()).toBe(false);
  console.log("Is this valid", nameInput.validity);
  expect(nameInput.validity.tooShort).toBe(true);

  // 2. Test: Invalid characters (pattern=[a-zA-Z\s]+)
  await user.clear(nameInput);
  await user.type(nameInput, 'Name123');
  expect(nameInput.checkValidity()).toBe(false);
  expect(nameInput.validity.patternMismatch).toBe(true);

  // 3. Test: Valid input
  await user.clear(nameInput);
  await user.type(nameInput, 'John Doe');
  expect(nameInput.checkValidity()).toBe(true);
});
