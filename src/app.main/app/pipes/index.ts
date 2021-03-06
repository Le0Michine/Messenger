export * from './attachment.pipe';
export * from './chat-action.pipe';
export * from './cut-links.pipe';
export * from './format-date.pipe';
export * from './link-to-user.pipe';
export * from './safe.pipe';
export * from './sticker.pipe';
export * from './emoji.pipe';

// tslint:disable-next-line:max-line-length
import { MessageAttachmentIconPipe, MessageAttachmentSubTitlePipe, MessageAttachmentTitlePipe, MessageAttachmentUrlPipe } from './attachment.pipe';
import { ChatActionPipe } from './chat-action.pipe';
import { CutLinksPipe } from './cut-links.pipe';
import { FormatDatePipe } from './format-date.pipe';
import { LinkToUserPipe } from './link-to-user.pipe';
import { SafeHtmlPipe, SafeStylePipe, SafeUrlPipe, SafeRecourseUrlPipe } from './safe.pipe';
import { StickerPipe } from './sticker.pipe';
import { EmojiPipe } from './emoji.pipe';
import { UserAvatarPipe } from './user-avatar.pipe';
import { UserFirstNamePipe } from './user-first-name.pipe';

export const PIPES = [
    MessageAttachmentIconPipe,
    MessageAttachmentSubTitlePipe,
    MessageAttachmentTitlePipe,
    MessageAttachmentUrlPipe,
    LinkToUserPipe,
    FormatDatePipe,
    CutLinksPipe,
    ChatActionPipe,
    StickerPipe,
    EmojiPipe,
    SafeHtmlPipe,
    SafeStylePipe,
    SafeUrlPipe,
    SafeRecourseUrlPipe,
    UserAvatarPipe,
    UserFirstNamePipe
];
