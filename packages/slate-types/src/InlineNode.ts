import LinkNode from './LinkNode';
import MentionNode from './MentionNode';
import PlaceholderNode from './PlaceholderNode';
import TextNode from './TextNode';

type InlineNode = LinkNode | MentionNode | PlaceholderNode | TextNode;

export default InlineNode;
