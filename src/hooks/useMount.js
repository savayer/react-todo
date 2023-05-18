import { useEffect, useState } from 'react';

const useMount = ({ opened, animationDuration }) => {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		if (opened && !mounted) {
			setMounted(true);
		} else if (!opened && mounted) {
			setTimeout(() => {
				setMounted(false);
			}, animationDuration);
		}
	}, [opened]);

	return {
		mounted,
	};
};

export default useMount;
