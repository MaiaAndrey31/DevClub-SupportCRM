import {
  LinkIcon,
  Wrench,
  TrophyIcon,
  ChatIcon,
  CloverIcon,
} from "@phosphor-icons/react";
import Header from "../../components/Header";
import {
  HomeContainer,
  Title,
  Layout,
  Content,
  MainContent,
  MenuItem,
  ButtonSlide,
} from "./styles";
import theme from "../../styles/theme";
import { useNavigate } from "react-router-dom";

const status = "connected";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Header status={status} page="Dev Club Support CRM" />
      <Content>
        <MainContent>
          <HomeContainer>
            <Title>Bem-vindo ao Dev Club CRM</Title>
            <div>
              <MenuItem>
                <ButtonSlide
                  className="button_slide slide_diagonal"
                  onClick={() => navigate("/painel")}
                >
                  <TrophyIcon size={60} color={theme.colors.text} weight="fill" />
                  <p>Troféus Admin</p>
                </ButtonSlide>
              </MenuItem>
              <MenuItem>
                <ButtonSlide
                  className="button_slide slide_diagonal"
                  onClick={() => navigate("/links")}
                >
                  <LinkIcon size={60} color={theme.colors.text} weight="fill" />
                  <p>Links Úteis</p>
                </ButtonSlide>
              </MenuItem>
              <MenuItem>
                <ButtonSlide className="button_slide slide_diagonal"
                onClick={() => navigate("/chat")}>
                  <ChatIcon size={60} color={theme.colors.text} />
                  <p>IA Jéssyca</p>
                </ButtonSlide>
              </MenuItem>
              <MenuItem>
                <ButtonSlide className="button_slide slide_diagonal"
                onClick={() => navigate("/iarodolfo")}>
                  <ChatIcon size={60} color={theme.colors.text} />
                  <p>IA Rodolfo</p>
                </ButtonSlide>
              </MenuItem>
              {/* <MenuItem>
                <button className="button_slide slide_diagonal">
                  <Wrench size={60} color={theme.colors.text} />
                  <p>Tools</p>
                </button>
              </MenuItem> */}
            </div>
          </HomeContainer>
        </MainContent>
      </Content>
    </Layout>
  );
};

export default Home;
