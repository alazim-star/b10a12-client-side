import React from 'react';
import SectionTitle from '../Shard/SectionTitle';

const Accordion = () => {
    return (
        <div>
            <SectionTitle heading="Frequently Asked Questions" ></SectionTitle>
            <div className="join join-vertical w-3/4  ml-36 mb-20 ">
  <div className="collapse collapse-arrow join-item border-base-300 border">
    <input type="radio" name="my-accordion-4" defaultChecked />
    <div className="collapse-title text-xl font-medium">What is a scholarship?</div>
    <div className="collapse-content">
      <p>A scholarship is a financial award given to students to help pay for their education. It does not need to be repaid and is typically awarded based on various criteria, such as academic achievement, extracurricular activities, leadership qualities, or specific talents.

There are different types of scholarships , the most important being:

Merit-Based Scholarships
Need-Based Scholarships
Specific Scholarships
Field of Study Scholarships
Applying for a scholarship often requires submitting an application form, essays, recommendation letters, and academic transcripts. Winning a scholarship can significantly reduce the financial burden of higher education, allowing students to focus more on their studies and less on financial concerns.</p>
    </div>
  </div>
  <div className="collapse collapse-arrow join-item border-base-300 border">
    <input type="radio" name="my-accordion-4" />
    <div className="collapse-title text-xl font-medium">Are scholarships taxable?</div>
    <div className="collapse-content">
      <p>Whether scholarships are taxable depends on several factors, including how the scholarship money is used and the country's tax laws where the student is studying. In many countries, scholarships used to pay for tuition, fees, books, and other necessary supplies are not considered taxable income. This means if you use the scholarship money strictly for these educational expenses, you typically won't have to pay taxes on it.

If a scholarship covers living expenses like room and board, travel, or optional equipment, that portion of the scholarship might be taxable. Moreover, some scholarships come with conditions, such as teaching or research obligations. In these cases, the scholarship may be considered compensation for services, and thus taxable.</p>
    </div>
  </div>
  <div className="collapse collapse-arrow join-item border-base-300 border">
    <input type="radio" name="my-accordion-4" />
    <div className="collapse-title text-xl font-medium">How to Write an Application for a Scholarship?</div>
    <div className="collapse-content">
      <p>To write a scholarship application, start by understanding the requirements. Craft a convincing scholarship motivation letter , highlighting your achievements, goals, and how the scholarship will help you. Gather necessary documents, such as transcripts and recommendation letters. Follow the application guidelines precisely, proofread your submission, and ensure you meet the deadline.</p>
    </div>
  </div>
  <div className="collapse collapse-arrow join-item border-base-300 border">
    <input type="radio" name="my-accordion-4" />
    <div className="collapse-title text-xl font-medium">Do you have to pay back a scholarship?</div>
    <div className="collapse-content">
      <p>Generally, you don’t have to pay back a scholarship; they are Non-Repayable gifts meant to help cover educational expenses. However, there are specific conditions, such as maintaining a certain GPA, to keep the scholarship. Moreover, some scholarships may require you to work in a specific field or location after graduation. If you don’t fulfil this commitment, you might have to repay the funds.</p>
    </div>
  </div>
</div>
        </div>
    );
};

export default Accordion