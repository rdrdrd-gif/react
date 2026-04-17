
## Input

```javascript
// @validateNoDerivedComputationsInEffects_exp
import {useEffect, useState} from 'react';

function Component({value}) {
  const [localValue, setLocalValue] = useState('');

  useEffect(() => {
    setLocalValue(value);
    document.title = `Value: ${value}`;
  }, [value]);

  return <div>{localValue}</div>;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{value: 'test'}],
};

```


## Error

```
Found 1 error:

Error: You might not need an effect. Derive values in render, not effects.

This value is derived from the prop `value`, so it should be computed during render instead of inside an effect. Running a derived computation in an effect schedules an unnecessary extra render and can briefly show stale values to the user. Replace the `useState` + `useEffect` pair with a plain `const` (or `useMemo` if the computation is expensive) that is recomputed from the same source(s) during render. See https://react.dev/learn/you-might-not-need-an-effect#updating-state-based-on-props-or-state for more details.

error.derived-state-from-prop-with-side-effect.ts:8:4
   6 |
   7 |   useEffect(() => {
>  8 |     setLocalValue(value);
     |     ^^^^^^^^^^^^^ Derive this value during render instead of updating state from an effect
   9 |     document.title = `Value: ${value}`;
  10 |   }, [value]);
  11 |
```
          
      