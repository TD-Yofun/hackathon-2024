import React from 'react';

import Flex from '@cobalt/react-flex';
import Icon, { Name } from '@cobalt/react-icon';
import { Heading, Text } from '@cobalt/react-typography';

import { HACKATHON_NAME } from '@/constant';

import imageSrc from '../../assets/welcome.png';

const NoConversation = () => {
  const introductions: Array<{
    icon: Name;
    message: string;
  }> = [
    {
      icon: 'call',
      message: 'User-Friendly Interface',
    },
    {
      icon: 'email',
      message: 'Real-Time Processing',
    },
    {
      icon: 'chart',
      message: 'Customizable Templates',
    },
    {
      icon: 'whatsapp',
      message: 'Multi-Source Integration',
    },
  ];

  return (
    <Flex width="100%" height="100%" alignX="center" alignY="center">
      <Flex width="80%" height="100%" direction="column" alignX="center" alignY="center" gap={3}>
        {/* <Flex
          width="88px"
          height="88px"
          style={{
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "4px",
            backgroundColor: "var(--primary-600)",
          }}
          alignX="center"
          alignY="center"
        >
          <Icon name="robot" size="large" color="#fff" />
        </Flex> */}

        <Flex width="100px">
          <img src={imageSrc} alt="" width="100%" />
        </Flex>

        <Heading level={2}>Welcome to {HACKATHON_NAME}</Heading>

        <Text color="var(--gray-600)" textAlign="center">
          The {HACKATHON_NAME} is an intelligent data report generator that allows users to create desired reports and
          charts through natural language conversations with AI
        </Text>

        <Flex direction="column" gap={3}>
          {introductions.map((introduction, index) => {
            return (
              <Flex key={index} alignY="center" gap={2}>
                <Icon name={introduction.icon} size="small" color="var(--primary-600)" />

                <Text>{introduction.message}</Text>
              </Flex>
            );
          })}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default NoConversation;
