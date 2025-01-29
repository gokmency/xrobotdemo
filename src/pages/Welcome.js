import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import { SplineScene } from '../components/ui/splite';
import { Card } from '../components/ui/card';
import { Spotlight } from '../components/ui/spotlight';
import { FiMail, FiUser, FiMessageSquare, FiCheck, FiX } from 'react-icons/fi';
import ReactConfetti from 'react-confetti';
import { Typewriter } from '../components/ui/typewriter';
import { MagneticButton } from '../components/ui/magnetic-button';
import { Footer } from '../components/ui/footer';

const WelcomeContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100vh;
    background: ${({ theme }) => theme.gradients.glow};
    pointer-events: none;
    z-index: 1;
  }
`;

const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5%;
  position: relative;
  overflow: hidden;
`;

const HeroContent = styled(motion.div)`
  max-width: 600px;
  z-index: 3;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: ${({ theme }) => theme.gradients.glow};
    opacity: 0.5;
    filter: blur(80px);
    z-index: -1;
  }
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 1.2;
  font-weight: 700;
  
  span {
    background: ${({ theme }) => theme.gradients.primary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Description = styled(motion.p)`
  font-size: clamp(1rem, 2vw, 1.2rem);
  margin-bottom: 2.5rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
  max-width: 90%;
`;

const CTAButton = styled(motion.button)`
  padding: 1.2rem 3rem;
  background: ${({ theme }) => theme.gradients.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  position: relative;
  overflow: hidden;
  transition: ${({ theme }) => theme.transitions.default};
  box-shadow: ${({ theme }) => theme.shadows.primary};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.glow};
    background: ${({ theme }) => theme.gradients.hover};
  }
`;

const ModelContainer = styled.div`
  width: 50%;
  height: 90vh;
  position: relative;
  background: transparent;
  overflow: visible;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: -5%;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const SplineContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
`;

const LiveStats = styled(motion.div)`
  position: absolute;
  bottom: 2rem;
  left: 5%;
  right: 5%;
  display: flex;
  justify-content: space-between;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.card.background};
  border: 1px solid ${({ theme }) => theme.colors.card.border};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.shadows.card};
  backdrop-filter: blur(20px);
  z-index: 3;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-wrap: wrap;
    gap: 1rem;
    bottom: 1rem;
    left: 3%;
    right: 3%;
    padding: 1.5rem;
  }
`;

const StatItem = styled.div`
  text-align: center;
  padding: 0 1.5rem;
  position: relative;
  
  &:not(:last-child)::after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 1px;
    height: 40%;
    background: ${({ theme }) => theme.colors.card.border};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex: 1 1 40%;
    
    &:not(:last-child)::after {
      display: none;
    }
  }
  
  h3 {
    color: ${({ theme }) => theme.colors.text.primary};
    font-size: clamp(1.2rem, 3vw, 1.5rem);
    margin-bottom: 0.5rem;
    font-weight: 700;
  }
  
  p {
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: clamp(0.9rem, 1.5vw, 1rem);
  }
`;

const ContactButton = styled(motion.button)`
  position: fixed;
  right: 40px;
  bottom: 40px;
  padding: 15px 25px;
  background: ${({ theme }) => theme.gradients.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 1.1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  z-index: 100;
  box-shadow: ${({ theme }) => theme.shadows.primary};
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.glow};
    background: ${({ theme }) => theme.gradients.hover};
  }

  svg {
    font-size: 1.2rem;
  }
`;

const ContactForm = styled(motion.div)`
  position: fixed;
  right: ${({ isOpen }) => (isOpen ? '220px' : '180px')};
  bottom: 40px;
  padding: 30px;
  background: ${({ theme }) => theme.colors.card.background};
  border: 1px solid ${({ theme }) => theme.colors.card.border};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  backdrop-filter: blur(20px);
  z-index: 99;
  box-shadow: ${({ theme }) => theme.shadows.card};
  width: 400px;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  pointer-events: ${({ isOpen }) => (isOpen ? 'all' : 'none')};
  transform: translateX(${({ isOpen }) => (isOpen ? '0' : '20px')});
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &::before {
    content: '';
    position: absolute;
    right: -8px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-left: 8px solid ${({ theme }) => theme.colors.card.border};
  }
`;

const FormTitle = styled.h3`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 20px;
  background: ${({ theme }) => theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
  
  label {
    display: block;
    color: ${({ theme }) => theme.colors.text.secondary};
    margin-bottom: 8px;
    font-size: 0.9rem;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  background: ${({ theme }) => theme.colors.card.hover};
  border: 1px solid ${({ theme }) => theme.colors.card.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1rem;
  transition: ${({ theme }) => theme.transitions.default};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  background: ${({ theme }) => theme.colors.card.hover};
  border: 1px solid ${({ theme }) => theme.colors.card.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  transition: ${({ theme }) => theme.transitions.default};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 12px;
  background: ${({ theme }) => theme.gradients.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};
  
  &:hover {
    background: ${({ theme }) => theme.gradients.hover};
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }
`;

const FormMessage = styled(motion.div)`
  padding: 12px;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  
  ${({ type, theme }) =>
    type === 'success'
      ? `
    background: ${theme.colors.success}15;
    color: ${theme.colors.success};
    border: 1px solid ${theme.colors.success}30;
    `
      : `
    background: ${theme.colors.error}15;
    color: ${theme.colors.error};
    border: 1px solid ${theme.colors.error}30;
    `}
`;

const LoadingSpinner = styled(motion.div)`
  width: 20px;
  height: 20px;
  border: 2px solid ${({ theme }) => theme.colors.card.border};
  border-top-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
`;

const AnimatedSpan = styled.span`
  background: ${({ theme }) => theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
`;

const Welcome = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const navigate = useNavigate();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Update window size on resize
  React.useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const validateForm = () => {
    if (!formState.name.trim()) return 'Lütfen adınızı girin';
    if (!formState.email.trim()) return 'Lütfen e-posta adresinizi girin';
    if (!formState.email.includes('@')) return 'Geçerli bir e-posta adresi girin';
    if (!formState.message.trim()) return 'Lütfen mesajınızı girin';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const error = validateForm();
    if (error) {
      setFormMessage({ type: 'error', text: error });
      return;
    }

    setIsSubmitting(true);
    setFormMessage(null);

    try {
      // Simüle edilmiş API çağrısı
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setFormMessage({ type: 'success', text: 'Mesajınız başarıyla gönderildi!' });
      setShowConfetti(true);
      setFormState({ name: '', email: '', message: '' });
      
      // 5 saniye sonra formu kapat
      setTimeout(() => {
        setIsContactOpen(false);
        setFormMessage(null);
        setShowConfetti(false);
      }, 5000);
    } catch (error) {
      setFormMessage({ type: 'error', text: 'Bir hata oluştu. Lütfen tekrar deneyin.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <WelcomeContainer>
      <HeroSection ref={ref}>
        <HeroContent
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <Title>
            Robotik Geleceğine{' '}
            <AnimatedSpan>
              <Typewriter
                text={[
                  'Sahip Ol',
                  'Başla',
                  'Yatırım Yap',
                  'Sahip Ol'
                ]}
                speed={70}
                waitTime={1500}
                deleteSpeed={40}
                cursorChar="_"
                className="gradient-text"
              />
            </AnimatedSpan>
          </Title>
          <Description>
            Gelir getiren robotların kesirli sahipliğine yatırım yapın.
            Otomatik servis dağıtımındaki devrime katılın ve pasif gelir elde edin.
          </Description>
          <MagneticButton distance={0.5}>
            <CTAButton
              onClick={() => navigate('/presale')}
            >
              Uygulamaya Git
            </CTAButton>
          </MagneticButton>
        </HeroContent>

        <ModelContainer>
          <SplineContainer>
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </SplineContainer>
        </ModelContainer>

        <LiveStats
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <StatItem>
            <h3>50+</h3>
            <p>Aktif Robot</p>
          </StatItem>
          <StatItem>
            <h3>$2.5M+</h3>
            <p>Toplam Gelir</p>
          </StatItem>
          <StatItem>
            <h3>10,000+</h3>
            <p>Token Sahibi</p>
          </StatItem>
          <StatItem>
            <h3>95%</h3>
            <p>Kullanım Oranı</p>
          </StatItem>
        </LiveStats>
      </HeroSection>

      <ContactButton
        onClick={() => setIsContactOpen(!isContactOpen)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <FiMail /> İletişim
      </ContactButton>

      <AnimatePresence>
        {isContactOpen && (
          <ContactForm
            isOpen={isContactOpen}
            as="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <FormTitle>Bize Ulaşın</FormTitle>
            
            {formMessage && (
              <FormMessage
                type={formMessage.type}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {formMessage.type === 'success' ? <FiCheck /> : <FiX />}
                {formMessage.text}
              </FormMessage>
            )}

            <InputGroup>
              <label>Ad Soyad</label>
              <Input 
                type="text"
                name="name"
                value={formState.name}
                onChange={handleInputChange}
                placeholder="Adınız ve soyadınız"
                disabled={isSubmitting}
              />
            </InputGroup>
            
            <InputGroup>
              <label>E-posta</label>
              <Input 
                type="email"
                name="email"
                value={formState.email}
                onChange={handleInputChange}
                placeholder="E-posta adresiniz"
                disabled={isSubmitting}
              />
            </InputGroup>
            
            <InputGroup>
              <label>Mesajınız</label>
              <TextArea 
                name="message"
                value={formState.message}
                onChange={handleInputChange}
                placeholder="Mesajınızı buraya yazın..."
                disabled={isSubmitting}
              />
            </InputGroup>
            
            <SubmitButton
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            >
              {isSubmitting ? (
                <LoadingSpinner
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              ) : (
                'Gönder'
              )}
            </SubmitButton>
          </ContactForm>
        )}
      </AnimatePresence>

      {showConfetti && (
        <ReactConfetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={200}
          recycle={false}
          onConfettiComplete={() => setShowConfetti(false)}
        />
      )}

      <Footer />
    </WelcomeContainer>
  );
};

export default Welcome;
