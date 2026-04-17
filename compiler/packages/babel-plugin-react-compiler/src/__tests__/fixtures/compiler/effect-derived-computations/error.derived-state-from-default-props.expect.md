
## Input

```javascript
// @validateNoDerivedComputationsInEffects_exp
import {useEffect, useState} from 'react';

export default function Component({input = 'empty'}) {
  const [currInput, setCurrInput] = useState(input);
  const localConst = 'local const';

  useEffect(() => {
    setCurrInput(input + localConst);
  }, [input, localConst]);

  return <div>{currInput}</div>;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{input: 'test'}],
};

```


## Error

```
Found 1 error:

Error: You might not need an effect. Derive values in render, not effects.

This value is derived from the prop `input`, so it should be computed during render instead of inside an effect. Running a derived computation in an effect schedules an unnecessary extra render and can briefly show stale values to the user. Replace the `useState` + `useEffect` pair with a plain `const` (or `useMemo` if the computation is expensive) that is recomputed from the same source(s) during render. See https://react.dev/learn/you-might-not-need-an-effect#updating-state-based-on-props-or-state for more details.

error.derived-state-from-default-props.ts:9:4
   7 |
   8 |   useEffect(() => {
>  9 |     setCurrInput(input + localConst);
     |     ^^^^^^^^^^^^ Derive this value during render instead of updating state from an effect
  10 |   }, [input, localConst]);
  11 |
  12 |   return <div>{currInput}</div>;
```
          
      