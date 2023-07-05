const ShortInstructions = () => (
  <short-instructions>
    <p>
      Welcome to this crowdsourcing project, where your help is needed to
      identify pigmented iris freckles in iris images.
    </p>
    <p>
      Place a point in the center of pigmented iris freckles using your mouse.
    </p>
    <p>You need to annotate as many pigmented iris freckles as possible.</p>
    <p>
      If you suspect that some are pigmented iris freckles but are not quite
      sure, you can use the "Potential pigmented iris freckles (unsure)" option
      to label them.
    </p>
    <p>
      If no pigmented iris freckle is present in the image, tick "Nothing to
      label" in the designated area.
    </p>
    <figure>
      <img
        src="https://crowdiris.s3.us-west-1.amazonaws.com/Cropped/E1.png"
        alt="Eyes with clearly visible freckles"
        width="200"
        height="200"
      />

      <figcaption>Fig.1a - Eyes with clearly visible freckles.</figcaption>
    </figure>
    <figure>
      <img
        src="https://crowdiris.s3.us-west-1.amazonaws.com/Cropped/E1A.png"
        alt="Eyes with clearly visible freckles"
        width="200"
        height="200"
      />

      <figcaption>Fig.1b - Eyes with points on freckles.</figcaption>
    </figure>
    <figure>
      <img
        src="https://crowdiris.s3.us-west-1.amazonaws.com/Cropped/E2.png"
        alt="Eyes with clearly visible freckles"
        width="200"
        height="200"
      />

      <figcaption>Fig.2a - Eyes with clearly visible freckles.</figcaption>
    </figure>
    <figure>
      <img
        src="https://crowdiris.s3.us-west-1.amazonaws.com/Cropped/E2A.png"
        alt="Eyes with clearly visible freckles"
        width="200"
        height="200"
      />

      <figcaption>Fig.2b - Eyes with points on freckles.</figcaption>
    </figure>
    <p> A pigmented iris freckle is:</p>
    <ol>
      <li>Different in colour to that of the peripupillary ring</li>
      <li>Separated from the peripupillary ring</li>

      <li>Darker in colour than the iris, usually brown</li>
      <li>Not visibly different in texture to the rest of the iris surface</li>
      <li>Not visibly raised, but flat</li>
      <li>Similar in size to other freckles in the iris</li>
      <li>Not spread into the pupil, or the sclera</li>
    </ol>
    <figure>
      <img
        src="https://crowdiris.s3.us-west-1.amazonaws.com/examples/c3.jpg"
        alt="Eyes with clearly visible freckles"
        width="200"
        height="200"
      />

      <figcaption>
        Fig.3 - Eyes with pupillary rings but no freckles.
      </figcaption>
    </figure>
    <figure>
      <img
        src="https://crowdiris.s3.us-west-1.amazonaws.com/examples/d3.jpg"
        alt="Eyes with clearly visible freckles"
        width="200"
        height="200"
      />

      <figcaption>
        Fig.4 - Eyes with both pupillary ring and freckles.
      </figcaption>
    </figure>
    If no pigmented iris freckle is present in the image, tick "Nothing to
    label" in the designated area.
  </short-instructions>
);

const FullInsturctions = () => (
  <full-instructions header="Instructions">
    <p>
      {" "}
      Welcome to this crowdsourcing project, where your help is needed to
      identify pigmented iris freckles in iris images.
    </p>

    <p>
      Guidelines: Please take your time to carefully examine each image, and
      ensure that your markings accurately reflect the presence and location of
      pigmented iris freckles. If you are unsure of the presence of a freckle,
      it is better to indicate that there are no freckles.
    </p>

    <p>Instructions:</p>

    <p>View the iris image and examine it carefully.</p>
    <ol>
      <li>
        If a pigmented iris freckle is present in the image, use your mouse to
        place a point in the center of the pigmented iris freckle on the image.
      </li>
      <li>
        If you suspect that some are pigmented iris freckles but are not quite
        sure, you can use the "Potential pigmented iris freckles (unsure)"
        option to label them.
      </li>
      <li>
        If no pigmented iris freckle is present in the image, tick "Nothing to
        label" in the designated area.
      </li>

      <li>Repeat the process for each iris image.</li>

      <li>Submit your results for review.</li>
    </ol>

    <p>More examples:</p>

    <figure>
      <img
        src="https://crowdiris.s3.us-west-1.amazonaws.com/Cropped/E3.png"
        alt="Eyes with clearly visible freckles"
        width="200"
        height="200"
      />

      <figcaption>Fig.5a - Eyes with clearly visible freckles.</figcaption>
    </figure>

    <figure>
      <img
        src="https://crowdiris.s3.us-west-1.amazonaws.com/Cropped/E3A.png"
        alt="Eyes with clearly visible freckles"
        width="200"
        height="200"
      />

      <figcaption>Fig.5b - Eyes with points on freckles.</figcaption>
    </figure>

    <figure>
      <img
        src="https://crowdiris.s3.us-west-1.amazonaws.com/Cropped/E4.png"
        alt="Eyes with clearly visible freckles"
        width="200"
        height="200"
      />

      <figcaption>Fig.6a - Eyes with clearly visible freckles.</figcaption>
    </figure>

    <figure>
      <img
        src="https://crowdiris.s3.us-west-1.amazonaws.com/Cropped/E4A.png"
        alt="Eyes with clearly visible freckles"
        width="200"
        height="200"
      />

      <figcaption>Fig.6b - Eyes with points on freckles.</figcaption>
    </figure>

    <figure>
      <img
        src="https://crowdiris.s3.us-west-1.amazonaws.com/Cropped/E5.png"
        alt="Eyes with clearly visible freckles"
        width="200"
        height="200"
      />

      <figcaption>Fig.7a - Eyes with clearly visible freckles.</figcaption>
    </figure>

    <figure>
      <img
        src="https://crowdiris.s3.us-west-1.amazonaws.com/Cropped/E5A.png"
        alt="Eyes with clearly visible freckles"
        width="200"
        height="200"
      />

      <figcaption>Fig.7b - Eyes with points on freckles.</figcaption>
    </figure>
  </full-instructions>
);

const CrowdComponent = ({ onSubmit, taskData }) => {
  const labels = [
    "Pigmented Iris Freckles",
    "Potential pigmented irs freckles (unsure)",
  ];

  const enscapsulatedLabels = `[${labels
    .map((label) => `'${label}'`)
    .join(",")}]`;

  const imageUrl = taskData.imageUrl;
  console.log(imageUrl)

  const onFormSubmit = (e) => {
    e.preventDefault();
    const keypoints =
      document.querySelector("crowd-keypoint").value.keypoints ||
      document.querySelector("crowd-keypoint")._submittableValue.keypoints;
    console.log(keypoints);
    const submitData = keypoints;
    onSubmit?.(submitData);
  };

  return (
    <crowd-form onSubmit={onFormSubmit} answer-format="flatten-objects">
      <crowd-keypoint
        src={imageUrl}
        labels={enscapsulatedLabels}
        header="You need to place points on the pigmented iris freckles and annotate as many of them as possible. If you suspect that some are pigmented iris freckles but are not quite sure, you can use unsure option"
        name="annotatedResult"
      >
        <ShortInstructions />
        <FullInsturctions />
      </crowd-keypoint>
    </crowd-form>
  );
};

export default CrowdComponent;
