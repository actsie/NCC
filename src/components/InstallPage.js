import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import { ArrowDownCircleIcon } from '@heroicons/react/24/outline';

const InstallPage = () => {
  return (
    <PageWrapper>
      <Header />

      <MainContent>
        <Container>
          <Title>Welcome to Pawgrammer Beta</Title>
          <Subtitle>Thank you for being one of our early testers! ✨</Subtitle>

          <DownloadSection>
            <DownloadButton
              href="/Pawgrammer-1.1.0-arm64.dmg"
              download="Pawgrammer-1.1.0-arm64.dmg"
            >
              <img src="/apple-logo.png" alt="Apple" className="apple-icon" />
              <span>Download MAC version</span>
            </DownloadButton>

            <Version>Version 1.1.0 (ARM64)</Version>
          </DownloadSection>

          <InfoSection>
            <InfoCard>
              <CardTitle>Installation Steps</CardTitle>
              <ol>
                <li>Download the .dmg file above</li>
                <li>Open the downloaded file</li>
                <li>Drag Pawgrammer to Applications</li>
                <li>Launch from Applications folder</li>
              </ol>
            </InfoCard>
          </InfoSection>

          <DocsLink>
            Need help? Check out the <a href="/docs">Documentation</a>
          </DocsLink>
        </Container>
      </MainContent>

      <Footer />
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #faf5ff 0%, #ffffff 100%);
`;

const MainContent = styled.main`
  flex: 1;
  padding: 80px 20px 60px;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: #1F2937;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: #6B7280;
  margin-bottom: 60px;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const DownloadSection = styled.div`
  margin-bottom: 60px;
`;

const DownloadButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 16px 32px;
  background: linear-gradient(135deg, #7866CC, #AF97F8);
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  color: white !important;
  cursor: pointer;
  transition: all 0.15s ease;
  box-shadow: 0 4px 12px rgba(120, 102, 204, 0.3);
  text-decoration: none;

  .apple-icon {
    height: 1.2em;
    width: auto;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(120, 102, 204, 0.4);
    color: white !important;
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 14px 28px;
  }
`;

const Version = styled.p`
  margin-top: 12px;
  font-size: 0.875rem;
  color: #9CA3AF;
`;

const InfoSection = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
`;

const InfoCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  text-align: left;
  max-width: 500px;

  ul, ol {
    margin: 16px 0 0 0;
    padding-left: 20px;
  }

  li {
    margin-bottom: 8px;
    color: #4B5563;
    line-height: 1.6;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 8px;
`;

const DocsLink = styled.p`
  font-size: 1rem;
  color: #6B7280;

  a {
    color: #7866CC;
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default InstallPage;
