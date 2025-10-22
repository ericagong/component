// storybook 테스트 vitest 설정 파일
import * as a11yAddonAnnotations from '@storybook/addon-a11y/preview';
import { setProjectAnnotations } from '@storybook/react-vite';

import * as projectAnnotations from './preview';

// story 렌더 환경과 테스트 환경 일관성 확보
// storybook 전역 설정 및 애드온 설정을 vitest 테스트 환경에 적용
setProjectAnnotations([a11yAddonAnnotations, projectAnnotations]);
