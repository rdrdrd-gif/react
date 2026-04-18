
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

This state is computed from props (value) and kept in sync with an effect. Props are already reactive, so compute this value directly during render instead of mirroring it into state — this removes the redundant useState plus useEffect pair and avoids the extra render that can briefly show stale values to users. See https://react.dev/learn/you-might-not-need-an-effect#updating-state-based-on-props-or-state.

error.derived-state-from-prop-with-side-effect.ts:8:4
   6 |
   7 |   useEffect(() => {
>  8 |     setLocalValue(value);
     |     ^^^^^^^^^^^^^ This is computed from props (value) — derive it during render instead of in an effect
   9 |     document.title = `Value: ${value}`;
  10 |   }, [value]);
  11 |
```
          
      