import HeadButton from '../shared/sections/HeadButton';
import { Wrapper, WrapperBody } from '../shared/sections/Wrapper';
import styles from './AboutViewFactory.module.css';
import Github from '@/assets/Github.svg';
import Linkedin from '@/assets/Linkedin.svg';
import Portfolio from '@/assets/Portfolio.svg';

function AboutViewFactory() {
  return (
    <Wrapper className={styles.wrap}>
      <HeadButton title="About Info" style={{ maxWidth: '50rem', alignSelf: 'center' }} />
      <WrapperBody className={styles.container}>
        <div className={styles.links}>
          <div>
            <img src={Github} alt="Github" />
            <span>
              Made with <span role="img" aria-label="heart">❤️</span> by
              <a href="https://github.com/Chucky22Mendoza" target="_blank"> Jesús Mendoza Verduzco</a>
            </span>
          </div>
          <div>
            <img src={Linkedin} alt="Linkedin" />
            <a href="https://www.linkedin.com/in/jes%C3%BAsmendoza22/" target="_blank">My Linkedin profile</a>
          </div>
          <div>
            <img src={Portfolio} alt="Portfolio" />
            <a href="https://jesus-mendoza.pages.dev" target="_blank">My Portfolio</a>
          </div>
        </div>
      </WrapperBody>
    </Wrapper>
  );
}

export default AboutViewFactory;
