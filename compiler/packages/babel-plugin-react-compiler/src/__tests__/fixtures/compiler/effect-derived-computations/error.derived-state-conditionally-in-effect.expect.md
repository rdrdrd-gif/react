
## Input

```javascript
// @validateNoDerivedComputationsInEffects_exp
import {useEffect, useState} from 'react';

function Component({value, enabled}) {
  const [localValue, setLocalValue] = useState('');

  useEffect(() => {
    if (enabled) {
      setLocalValue(value);
    } else {
      setLocalValue('disabled');
    }
  }, [value, enabled]);

  return <div>{localValue}</div>;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{value: 'test', enabled: true}],
};

```


## Error

```
Found 1 error:

Error: You might not need an effect. Derive values in render, not effects.

This value is derived from the prop `value`, so it should be computed during render instead of inside an effect. Running a derived computation in an effect schedules an unnecessary extra render and can briefly show stale values to the user. Replace the `useState` + `useEffect` pair with a plain `const` (or `useMemo` if the computation is expensive) that is recomputed from the same source(s) during render. See https://react.dev/learn/you-might-not-need-an-effect#updating-state-based-on-props-or-state for more details.

error.derived-state-conditionally-in-effect.ts:9:6
   7 |   useEffect(() => {
   8 |     if (enabled) {
>  9 |       setLocalValue(value);
     |       ^^^^^^^^^^^^^ Derive this value during render instead of updating state from an effect
  10 |     } else {
  11 |       setLocalValue('disabled');
  12 |     }
```
          
      