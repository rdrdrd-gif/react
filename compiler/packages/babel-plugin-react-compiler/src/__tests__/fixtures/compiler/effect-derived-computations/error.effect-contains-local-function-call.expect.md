
## Input

```javascript
// @validateNoDerivedComputationsInEffects_exp
import {useEffect, useState} from 'react';

function Component({propValue}) {
  const [value, setValue] = useState(null);

  function localFunction() {
    console.log('local function');
  }

  useEffect(() => {
    setValue(propValue);
    localFunction();
  }, [propValue]);

  return <div>{value}</div>;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{propValue: 'test'}],
};

```


## Error

```
Found 1 error:

Error: You might not need an effect. Derive values in render, not effects.

This state is computed from props (propValue) and kept in sync with an effect. Props are already reactive, so compute this value directly during render instead of mirroring it into state — this removes the redundant useState plus useEffect pair and avoids the extra render that can briefly show stale values to users. See https://react.dev/learn/you-might-not-need-an-effect#updating-state-based-on-props-or-state.

error.effect-contains-local-function-call.ts:12:4
  10 |
  11 |   useEffect(() => {
> 12 |     setValue(propValue);
     |     ^^^^^^^^ This is computed from props (propValue) — derive it during render instead of in an effect
  13 |     localFunction();
  14 |   }, [propValue]);
  15 |
```
          
      