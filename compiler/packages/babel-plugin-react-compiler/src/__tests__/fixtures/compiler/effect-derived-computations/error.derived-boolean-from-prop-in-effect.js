// @validateNoDerivedComputationsInEffects_exp
import {useEffect, useState} from 'react';

function Component({items, threshold}) {
  const [isOverLimit, setIsOverLimit] = useState(false);

  useEffect(() => {
    setIsOverLimit(items.length > threshold);
  }, [items, threshold]);

  return <div>{isOverLimit ? 'over' : 'under'}</div>;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{items: [1, 2, 3], threshold: 2}],
};
