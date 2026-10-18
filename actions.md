https://res.cloudinary.com/jq9w302f/image/upload/f_auto,q_auto/cld-sample-4.jpg


CLOUD_NAME
API_KEY
API_SECRET
API_ENVIRONMENT_VARIABLE

## Cloudinary food-image upload

The backend uploads food images directly to Cloudinary. Keep these values only in `backend/.env` (that file is ignored by Git):

```env
CLOUD_NAME=your_cloud_name
API_KEY=your_api_key
API_ENVIRONMENT_VARIABLE=your_api_secret
```

The backend also accepts the clearer deployment names `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`; those names take precedence when both forms exist. Never commit either form or print their values.

Upload behavior:

- Files are held in memory and streamed to Cloudinary, so no new local image files are created.
- Assets are stored under `food-delivery/foods`.
- Images are limited to 10 MB and non-image MIME types are rejected.
- Cloudinary limits the largest dimension to 1200 pixels and applies automatic quality and format selection (`q_auto`, `f_auto`) for optimized delivery.
- MongoDB stores the Cloudinary `secure_url` in `image` and the `public_id` in `imagePublicId`.
- Removing a food item also removes its Cloudinary asset and invalidates cached copies.

After changing environment values, restart the backend with `npm run dev` from `backend/`. Existing food records that contain local filenames need a one-time migration or re-upload; new records use Cloudinary URLs directly.

## Migrate existing uploads

From the `backend/` directory, run:

```bash
npm run migrate:images
```

The migration connects to MongoDB before uploading anything, matches each local filename to the existing `Food.image` value, preserves existing record data, then replaces only `image` and adds `imagePublicId`. For the bundled legacy files with no existing record, it creates records using the explicit filename metadata in the migration script. It is safe to run again: records already containing an HTTPS image URL and a public ID are skipped. Any file without a matching record or explicit metadata is reported as `UNMATCHED`.