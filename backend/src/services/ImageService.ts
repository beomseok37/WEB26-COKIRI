import { Image } from 'src/models';

class ImageService {
  async findPostImage(postID: string) {
    return Image.find({ targetID: postID }, '-targetID');
  }

  async removePostImage(postID: string) {
    return Image.remove({ targetID: postID });
  }
}

export default new ImageService();