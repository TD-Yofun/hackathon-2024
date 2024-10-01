import activitiesSvg from '@/components/atlas/assets/activities.svg?raw';
import adminSvg from '@/components/atlas/assets/admin.svg?raw';
import aiTrainerSvg from '@/components/atlas/assets/ai_trainer.svg?raw';
import autopilotSvg from '@/components/atlas/assets/autopilot.svg?raw';
import builderSvg from '@/components/atlas/assets/builder.svg?raw';
import cardsAppSvg from '@/components/atlas/assets/cards_app.svg?raw';
// import contactConfigurationSvg from '@/components/atlas/assets/contact_configuration.svg?raw';
import contactsSvg from '@/components/atlas/assets/contacts.svg?raw';
import conversationSvg from '@/components/atlas/assets/conversation.svg?raw';
import copilotSvg from '@/components/atlas/assets/copilot.svg?raw';
import exploreSvg from '@/components/atlas/assets/explore.svg?raw';
import industriesSchedulerAdminSvg from '@/components/atlas/assets/industries_scheduler_admin.svg?raw';
import liveSvg from '@/components/atlas/assets/live.svg?raw';
import studioSvg from '@/components/atlas/assets/studio.svg?raw';
import workspaceDesignerSvg from '@/components/atlas/assets/workspace_designer.svg?raw';

interface Menu {
  path: string;
  title: string;
  icon: string;
}

export const menus: Menu[] = [
  {
    title: 'Conversation',
    icon: conversationSvg,
    path: '/conversation',
  },
  {
    title: 'Activities',
    icon: activitiesSvg,
    path: '/activities',
  },
  {
    title: 'Copilot',
    icon: copilotSvg,
    path: '/copilot',
  },
  {
    title: 'Contacts',
    icon: contactsSvg,
    path: '/contacts',
  },
  // {
  //   title: 'Contact Configuration',
  //   icon: contactConfigurationSvg,
  //   path: '/contact-configuration',
  // },
  {
    title: 'Studio',
    icon: studioSvg,
    path: '/studio',
  },
  {
    title: 'Builder',
    icon: builderSvg,
    path: '/builder',
  },
  {
    title: 'Workspace Designer',
    icon: workspaceDesignerSvg,
    path: '/workspace-designer',
  },
  {
    title: 'Cards App',
    icon: cardsAppSvg,
    path: '/cards-app',
  },
  {
    title: 'AI Trainer',
    icon: aiTrainerSvg,
    path: '/ai-trainer',
  },
  {
    title: 'Industries Scheduler Admin',
    icon: industriesSchedulerAdminSvg,
    path: '/industries-scheduler-admin',
  },
  {
    title: 'Autopilot',
    icon: autopilotSvg,
    path: '/autopilot',
  },
  {
    title: 'Live',
    icon: liveSvg,
    path: '/live',
  },
  {
    title: 'Explore',
    icon: exploreSvg,
    path: '/explore',
  },
  {
    title: 'Admin',
    icon: adminSvg,
    path: '/admin',
  },
];
