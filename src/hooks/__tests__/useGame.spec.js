/* eslint-disable no-unused-vars */
import { renderHook } from '@testing-library/react-hooks';
import React from 'react';
import { useGame } from '../../hooks/useGame.jsx';

describe('use game', () => {
  it('should throw an error if not used within a game provider', () => {
    const { result } = renderHook(() => useGame());
    expect(result.error).toEqual(
      Error('useGame must be used within a Game Provider')
    );
  });
});
