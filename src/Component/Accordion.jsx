import React from 'react';
import SectionTitle from '../Shard/SectionTitle';

const Accordion = () => {
    return (
        <div>
            <SectionTitle heading="Frequently Asked Questions" />
            <div className="lg:ml-32 join join-vertical w-11/12 md:w-3/4 mx-auto mb-20 p-4 bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg shadow-lg">
                {/* Accordion Item 1 */}
                <div className="collapse collapse-arrow join-item border border-teal-200 rounded-lg overflow-hidden shadow-sm">
                    <input type="radio" name="accordion" defaultChecked />
                    <div className="collapse-title flex items-center text-lg font-semibold text-teal-700 bg-teal-100 px-6 py-4">
                        <i className="fas fa-graduation-cap mr-3"></i>
                        What is a scholarship?
                    </div>
                    <div className="collapse-content bg-white text-gray-700 px-6 py-4">
                        <p>
                            A scholarship is a financial award given to students to help pay for their education. It does not need to be repaid and is typically awarded based on various criteria, such as academic achievement, extracurricular activities, leadership qualities, or specific talents.
                        </p>
                        <p className="mt-2">
                            There are different types of scholarships, including:
                        </p>
                        <ul className="list-disc list-inside pl-4 mt-2 text-teal-600">
                            <li>Merit-Based Scholarships</li>
                            <li>Need-Based Scholarships</li>
                            <li>Specific Scholarships</li>
                            <li>Field of Study Scholarships</li>
                        </ul>
                        <p className="mt-2">
                            Applying for a scholarship often requires submitting an application form, essays, recommendation letters, and academic transcripts. Winning a scholarship can significantly reduce the financial burden of higher education, allowing students to focus on their studies.
                        </p>
                    </div>
                </div>

                {/* Accordion Item 2 */}
                <div className="collapse collapse-arrow join-item border border-teal-200 rounded-lg overflow-hidden shadow-sm">
                    <input type="radio" name="accordion" />
                    <div className="collapse-title flex items-center text-lg font-semibold text-teal-700 bg-teal-100 px-6 py-4">
                        <i className="fas fa-money-check-alt mr-3"></i>
                        Are scholarships taxable?
                    </div>
                    <div className="collapse-content bg-white text-gray-700 px-6 py-4">
                        <p>
                            Whether scholarships are taxable depends on how the scholarship money is used and the tax laws in the student’s country. Scholarships used for tuition, fees, books, and other necessary supplies are generally not taxable. However, funds used for living expenses, travel, or optional equipment might be taxable.
                        </p>
                    </div>
                </div>

                {/* Accordion Item 3 */}
                <div className="collapse collapse-arrow join-item border border-teal-200 rounded-lg overflow-hidden shadow-sm">
                    <input type="radio" name="accordion" />
                    <div className="collapse-title flex items-center text-lg font-semibold text-teal-700 bg-teal-100 px-6 py-4">
                        <i className="fas fa-pencil-alt mr-3"></i>
                        How to Write an Application for a Scholarship?
                    </div>
                    <div className="collapse-content bg-white text-gray-700 px-6 py-4">
                        <p>
                            To write a scholarship application, understand the requirements. Highlight your achievements, goals, and how the scholarship will help you in your motivation letter. Gather necessary documents like transcripts and recommendation letters. Follow application guidelines, proofread carefully, and submit before the deadline.
                        </p>
                    </div>
                </div>

                {/* Accordion Item 4 */}
                <div className="collapse collapse-arrow join-item border border-teal-200 rounded-lg overflow-hidden shadow-sm">
                    <input type="radio" name="accordion" />
                    <div className="collapse-title flex items-center text-lg font-semibold text-teal-700 bg-teal-100 px-6 py-4">
                        <i className="fas fa-dollar-sign mr-3"></i>
                        Do you have to pay back a scholarship?
                    </div>
                    <div className="collapse-content bg-white text-gray-700 px-6 py-4">
                        <p>
                            Generally, you don’t have to pay back a scholarship as it is a non-repayable gift. However, certain scholarships have conditions, such as maintaining a specific GPA or working in a designated field after graduation. Failure to meet these conditions might require repayment.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Accordion;
