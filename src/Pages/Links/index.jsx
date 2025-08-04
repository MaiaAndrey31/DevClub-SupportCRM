import { useState, useEffect } from "react";
import { CopyIcon, PlusIcon, PencilSimpleIcon, TrashIcon, CheckIcon } from "@phosphor-icons/react";
import * as PhosphorIcons from "@phosphor-icons/react";
import {
  Layout,
  Container,
  Title,
  LinksGrid,
  LinkCard,
  LinkIcon,
  LinkContent,
  LinkTitle,
  LinkDescription,
  CopiedMessage,
  ActionButton,
  ActionButtons,
  AddButton,
} from "./styles";
import Header from "../../components/Header";
import LinkForm from "../../components/LinkForm";
import { getLinks, deleteLink } from "../../api/api";
import { toast } from 'react-toastify';

const Links = () => {
  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [copiedUrl, setCopiedUrl] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentLink, setCurrentLink] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Load links on component mount
  useEffect(() => {
    loadLinks();
  }, []);

  const loadLinks = async () => {
    try {
      setIsLoading(true);
      const data = await getLinks();
      setLinks(data);
    } catch (err) {
      const errorMsg = "Erro ao carregar os links. Tente novamente mais tarde.";
      setError(errorMsg);
      toast.error(errorMsg);
      console.error("Erro ao carregar links:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(url);
      // Reset the copied state after 2 seconds
      setTimeout(() => setCopiedUrl(""), 2000);
    } catch (err) {
      console.error("Falha ao copiar o link:", err);
      setError("Não foi possível copiar o link para a área de transferência.");
    }
  };

  const handleEdit = (link) => {
    setCurrentLink(link);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este link?")) return;

    try {
      setIsDeleting(id);
      await deleteLink(id);
      setLinks(links.filter((link) => link.id !== id));
      toast.success("Link excluído com sucesso!");
    } catch (err) {
      const errorMsg = "Não foi possível excluir o link. Tente novamente.";
      console.error("Erro ao excluir link:", err);
      toast.error(errorMsg);
      setError(errorMsg);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleFormSuccess = (isNew = true) => {
    loadLinks();
    setIsFormOpen(false);
    setCurrentLink(null);
    toast.success(isNew ? "Link criado com sucesso!" : "Link atualizado com sucesso!");
  };
  // Function to render icon dynamically based on icon name
  const renderIcon = (iconName, size = 32) => {
    const IconComponent =
      PhosphorIcons[`${iconName}Icon`] || PhosphorIcons.Link;
    return <IconComponent size={size} weight="bold" />;
  };

  return (
    <Layout>
      <Header status="connected" page="Links Úteis" />
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <Title>Links Úteis</Title>
          <AddButton
            onClick={() => {
              setCurrentLink(null);
              setIsFormOpen(true);
            }}
          >
            <PlusIcon size={20} weight="bold" /> Adicionar Link
          </AddButton>
        </div>

        {error && (
          <div style={{ color: "#ff6b6b", marginBottom: "1rem" }}>{error}</div>
        )}

        {isLoading ? (
          <div style={{ textAlign: "center", padding: "2rem" }}>
            Carregando links...
          </div>
        ) : links.length === 0 ? (
          <div
            style={{ textAlign: "center", padding: "2rem", color: "#a0aec0" }}
          >
            Nenhum link cadastrado. Clique em &quot;Adicionar Link&quot; para
            começar.
          </div>
        ) : (
          <LinksGrid>
            {links.map((link) => (
              <LinkCard
                key={link.id}
                onClick={() => copyToClipboard(link.url)}
                title={`Clique para copiar: ${link.url}`}
              >
                <LinkIcon>{renderIcon(link.icon || "Link")}</LinkIcon>
                <LinkContent>
                  <LinkTitle>{link.title}</LinkTitle>
                  <LinkDescription>
                    {link.description}
                  </LinkDescription>
                  {copiedUrl === link.url && (
                    <CopiedMessage>
                      <CheckIcon size={14} weight="bold" /> Copiado!
                    </CopiedMessage>
                  )}
                </LinkContent>
                <ActionButtons>
                  <ActionButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(link);
                    }}
                    title="Editar"
                  >
                    <PencilSimpleIcon size={18} />
                    <span>Editar</span>
                  </ActionButton>
                  <ActionButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(link.id);
                    }}
                    title="Excluir"
                    disabled={isDeleting === link.id}
                    $danger
                  >
                    <TrashIcon size={18} />
                    <span>Excluir</span>
                  </ActionButton>
                  
                </ActionButtons>
              </LinkCard>
            ))}
          </LinksGrid>
        )}
      </Container>

      {isFormOpen && (
        <LinkForm
          link={currentLink}
          onClose={() => {
            setIsFormOpen(false);
            setCurrentLink(null);
          }}
          onSuccess={() => handleFormSuccess(!currentLink)}
        />
      )}
    </Layout>
  );
};

// Removido bloco duplicado de return e JSX extra

export default Links;
