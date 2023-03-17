import './AboutMe.css';
import avatar from '../../images/avatar.jpg';

export default function AboutMe() {
  return (
    <section className="about-me">
      <div className="about-me__container">
        <h2 className="about-me__title">Студент</h2>
        <div className="about-me__bio-container">
          <div className="about-me__bio">
            <h3 className="about-me__name">Александр</h3>
            <p className="about-me__age">Фронтенд-разработчик, 27 лет</p>
            <p className="about-me__text">
              Я родился и до 17 лет жил в Казахстане, а именно, в городе Уральск. Сейчас живу в Москве, закончил Московский институт электронной техники по направлению "Биотехнические системы". Занимаюсь
              волейболом на любительском уровне, люблю настольный теннис и исследовать бары и рестораны.
              С 2020 года занимаюсь разработкой дистанционных курсов и сейчас работаю в компании Ralf Ringer.
            </p>
            <ul className="about-me__socials">
              <li>
                <a
                  href="https://t.me/agorodnichev"
                  target="_blank"
                  rel="noreferrer"
                  className="about-me__social-link"
                >
                  Телеграм
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Gorod35/"
                  target="_blank"
                  rel="noreferrer"
                  className="about-me__social-link"
                >
                  Github
                </a>
              </li>
            </ul>
          </div>
          <img
            className="about-me__avatar"
            src={avatar}
            alt="фотография разработчика приложения"
          />
        </div>
      </div>
    </section>
  );
}