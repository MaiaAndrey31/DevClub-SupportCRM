import {
  GiftIcon,
  LinkIcon,
  TrophyIcon,
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
import Rodolfo from "../../assets/RodolfoIA.png"
import Jessyca from "../../assets/JessycaIA.png"
import { PackageIcon } from "@phosphor-icons/react";
const status = "connected";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Header status={status} page="Dev Club Support CRM" />
      <Content>
        <MainContent>
          <HomeContainer>
            <Title>Dev Club Support CRM</Title>
            <div>
              <MenuItem>
                <ButtonSlide
                  className="button_slide slide_diagonal"
                  onClick={() => navigate("/painel")}
                >
                  <TrophyIcon size={60} color={theme.colors.accent} weight="fill" />
                  <p>Troféus Admin</p>
                </ButtonSlide>
              </MenuItem>
              <MenuItem>
                <ButtonSlide
                  className="button_slide slide_diagonal"
                  onClick={() => navigate("/links")}
                >
                  <LinkIcon size={60} color={theme.colors.accent} weight="fill" />
                  <p>Links Úteis</p>
                </ButtonSlide>
              </MenuItem>
              <MenuItem>
                <ButtonSlide className="button_slide slide_diagonal"
                onClick={() => navigate("/chat")}>
                  <img src={Jessyca} style={{ width: '70px', height: '70px', borderRadius: '50%', marginRight: '3px' }} />
                  <p>IA Jéssyca</p>
                </ButtonSlide>
              </MenuItem>
              <MenuItem>
                <ButtonSlide className="button_slide slide_diagonal"
                onClick={() => navigate("/iarodolfo")}>
                  <img src={Rodolfo} style={{ width: '70px', height: '70px', borderRadius: '50%', marginRight: '3px' }} />
                  <p>IA Rodolfo</p>
                </ButtonSlide>
              </MenuItem>
              <MenuItem>
                <ButtonSlide className="button_slide slide_diagonal"
                onClick={() => navigate("/bonus/manage")}>
                  <GiftIcon size={60} color={theme.colors.accent} />
                  <p>Bonus</p>
                </ButtonSlide>
              </MenuItem>
            </div>
          </HomeContainer>
        </MainContent>
      </Content>
    </Layout>
  );
};

export default Home;
